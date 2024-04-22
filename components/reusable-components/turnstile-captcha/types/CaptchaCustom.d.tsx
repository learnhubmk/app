/* eslint-disable */
interface Window {
  turnstile: {
    render(container: string | HTMLElement, params: any): string | undefined;
    remove(widgetId: string): void;
  };
}
/* eslint-enable */
