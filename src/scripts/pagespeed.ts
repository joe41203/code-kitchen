import fs from 'fs/promises';
import fetch from 'node-fetch';
import path from 'path';

interface PageSpeedApiResponse {
  captchaResult: string;
  kind: string;
  id: string;
  loadingExperience: LoadingExperience;
  originLoadingExperience: OriginLoadingExperience;
  lighthouseResult: LighthouseResult;
  analysisUTCTimestamp: string;
}

interface LoadingExperience {
  id: string;
  metrics: LoadingExperienceMetrics;
  overall_category: string;
  initial_url: string;
}

interface LoadingExperienceMetrics {
  FIRST_CONTENTFUL_PAINT_MS: Metric;
  FIRST_INPUT_DELAY_MS: Metric;
}

interface Metric {
  percentile: number;
  distributions: Distribution[];
  category: string;
}

interface Distribution {
  min: number;
  max?: number;
  proportion: number;
}

interface OriginLoadingExperience {
  id: string;
  metrics: OriginLoadingExperienceMetrics;
  overall_category: string;
  initial_url: string;
}

interface OriginLoadingExperienceMetrics {
  FIRST_CONTENTFUL_PAINT_MS: Metric;
  FIRST_INPUT_DELAY_MS: Metric;
}

interface LighthouseResult {
  requestedUrl: string;
  finalUrl: string;
  lighthouseVersion: string;
  userAgent: string;
  fetchTime: string;
  environment: Environment;
  runWarnings: any[];
  configSettings: ConfigSettings;
  audits: Audits;
  categories: Categories;
  categoryGroups: CategoryGroups;
  i18n: I18n;
}

interface Environment {
  networkUserAgent: string;
  hostUserAgent: string;
  benchmarkIndex: number;
}

interface ConfigSettings {
  emulatedFormFactor: string;
  locale: string;
  onlyCategories: string[];
}

interface Audits {
  [key: string]: Audit;
}

interface Audit {
  id: string;
  title: string;
  description: string;
  score: number;
  scoreDisplayMode: string;
  displayValue?: string;
  details?: AuditDetails;
}

interface AuditDetails {
  headings: any[];
  type: string;
  items: any[];
  overallSavingsMs: number;
}


type CategoryId = 'performance' | 'accessibility' | 'best-practices' | 'seo' | 'pwa';
type Strategy = "mobile" | "desktop"

interface Categories {
  [key: string]: Category;
}

interface Category {
  id: CategoryId;
  title: string;
  score: number;
  auditRefs: AuditRef[];
}

interface AuditRef {
  id: string;
  weight: number;
  group: string;
}

interface CategoryGroups {
  [key: string]: CategoryGroup;
}

interface CategoryGroup {
  title: string;
  description: string;
}

interface I18n {
  rendererFormattedStrings: RendererFormattedStrings;
}

interface RendererFormattedStrings {
  varianceDisclaimer: string;
  opportunityResourceColumnLabel: string;
  opportunitySavingsColumnLabel: string;
  errorMissingAuditInfo: string;
  errorLabel: string;
  warningHeader: string;
  auditGroupExpandTooltip: string;
  passedAuditsGroupTitle: string;
  notApplicableAuditsGroupTitle: string;
  manualAuditsGroupTitle: string;
  toplevelWarningsMessage: string;
  scorescaleLabel: string;
  crcLongestDurationLabel: string;
  crcInitialNavigation: string;
  lsPerformanceCategoryDescription: string;
  labDataTitle: string;
}

interface ReportData {
  url: string;
  id: CategoryId;
  score: number;
}

const base_url: string = "https://code-kitchen.pages.dev"

const getUrlsFromAstroBuild = async (): Promise<string[]> => {
  const distDir = path.join(process.cwd(), 'dist');
  const articleDir = path.join(distDir, 'articles');
  const files = await fs.readdir(articleDir);

  const urls: string[] = [];

  for (const file of files) {
    const articlePath = path.join(articleDir, file, 'index.html');
    try {
      await fs.access(articlePath);
      const url = `${base_url}/articles/${file}/`;
      urls.push(url);
    } catch (error) {
      console.warn(`Skipping ${file} directory, index.html not found.`);
    }
  }

  return urls;
};

const fetchPageSpeedData = async (
  url: string,
  categoryId: CategoryId,
  apiKey: string,
  strategy: Strategy = "mobile",
): Promise<PageSpeedApiResponse> => {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&key=${apiKey}&category=${categoryId}&strategy=${strategy}`;
  const response = await fetch(apiUrl);
  return response.json() as Promise<PageSpeedApiResponse>;
};

const extractReportData = (response: PageSpeedApiResponse, categoryId: CategoryId): ReportData => {
  if (!response.lighthouseResult.categories || !response.lighthouseResult.categories[categoryId]) {
    throw new Error(`Category '${categoryId}' not found in the response for URL: ${response.id}`);
  }

  return {
    url: response.id,
    id: response.lighthouseResult.categories[categoryId]["id"],
    score: response.lighthouseResult.categories[categoryId]["score"],
  };
};

const saveReportData = async (reportsData: ReportData[]): Promise<void> => {
  await fs.writeFile('dist/PageSpeedInsightsResult.json', JSON.stringify(reportsData, null, 2));
};

const main = async (): Promise<void> => {
  const urls = await getUrlsFromAstroBuild();
  const apiKey = process.env.GOOGLE_PAGE_SPEED_INSIGHTS_API_KEY;
  const categoryIds: CategoryId[] = [
    'performance',
    'accessibility',
    'best-practices',
    'seo',
    // 'pwa',
  ];

  if (!apiKey) {
    console.error(
      'GOOGLE_PAGE_SPEED_INSIGHTS_API_KEY is not defined in the environment variables.'
    );
    process.exit(1);
  }

  const fetchTasks: Promise<ReportData | null>[] = [];

  for (const url of urls) {
    for (const categoryId of categoryIds) {
      const fetchTask = fetchPageSpeedData(url, categoryId, apiKey)
        .then((response) => extractReportData(response, categoryId))
        .catch((error) => {
          console.error(`Error fetching data for URL: ${url}`, error);
          return null;
        });

      fetchTasks.push(fetchTask);
    }
  }

  const reportsDataWithNull = await Promise.all(fetchTasks);
  const reportsData: ReportData[] = reportsDataWithNull.filter((reportData): reportData is ReportData => reportData !== null);

  await saveReportData(reportsData);
};

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
