const allCss = [].slice
  .call(document.styleSheets)
  .reduce((prev, styleSheet) => {
    if (styleSheet.cssRules) {
      return (
        prev +
        [].slice.call(styleSheet.cssRules).reduce((prev, cssRule) => {
          return prev + cssRule.cssText;
        }, '')
      );
    } else {
      return prev;
    }
  }, '');

export interface Tool {
  name: string;
  displayName: { zh: string; en: string };
  toolType: string;
  shallow?: boolean;
  type: string;
  host: string;
  html: string;
  public: boolean;
  enterprise: boolean;
  featureGate: string;
  recommendedVersion?: string;
  description?: { [key: string]: string };
}

export interface ToolListChangeEmitter {
  tool: Tool;
}

function selectToolChange(change?: ToolListChangeEmitter) {
  this.selectedTool = change?.tool;
}

interface Options {
  color: 'black' | 'red' | 'yellow' | 'white';
}

type LiteralUnion<T extends U, U = string> = T | (U & {});

type Color = LiteralUnion<'black' | 'yellow'>;

const opts: Color = 'a';

// @errors: 2345
type NetworkLoadingState = { state: 'loading' };
type NetworkFailedState = { state: 'failed'; code: number };
type NetworkSuccessState = {
  state: 'success';
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};
type NetworkFromCachedState = {
  state: 'from_cache';
  response: NetworkSuccessState['response'];
};

type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState
  | NetworkFromCachedState;
// ---cut---
function assertNever(x: string): never {
  throw new Error('Unexpected object: ' + x);
}

function logger(s: NetworkState): string {
  switch (s.state) {
    case 'loading':
      return 'loading request';
    case 'failed':
      return `failed with code ${s.code}`;
    case 'success':
      return `got response ${s.response.duration}`;
    default:
      return assertNever(s.state);
  }
}
