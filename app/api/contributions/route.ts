import { NextResponse } from 'next/server';
import { personal } from '@/lib/content';

export const revalidate = 1800;

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const LEVEL_MAP: Record<string, Contribution['level']> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const GRAPHQL_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

// With a personal access token the calendar matches the logged-in
// profile view, including private-repo contributions. Without one we
// fall back to the public scraper, which only sees public activity.
async function fromGitHubGraphQL(token: string) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GRAPHQL_QUERY,
      variables: { login: personal.githubUsername },
    }),
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error(`graphql http ${res.status}`);
  const json = await res.json();
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) throw new Error('graphql: no calendar in response');

  const contributions: Contribution[] = cal.weeks.flatMap(
    (w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      }))
  );
  return { contributions, total: cal.totalContributions as number, source: 'github' };
}

async function fromPublicApi() {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${personal.githubUsername}?y=last`,
    { next: { revalidate: 1800 } }
  );
  if (!res.ok) throw new Error(`public api http ${res.status}`);
  const json = await res.json();
  const contributions: Contribution[] = json?.contributions ?? [];
  const total = contributions.reduce((s, c) => s + c.count, 0);
  return { contributions, total, source: 'public' };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    try {
      return NextResponse.json(await fromGitHubGraphQL(token));
    } catch {
      // fall through to public API
    }
  }
  try {
    return NextResponse.json(await fromPublicApi());
  } catch {
    return NextResponse.json(
      { contributions: [], total: 0, source: 'none' },
      { status: 502 }
    );
  }
}
