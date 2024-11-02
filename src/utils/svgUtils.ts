import { gridPadding } from "../components/Grid.tsx";

export function getTargetSize(element: HTMLElement) {
  const width = element.clientWidth - gridPadding * 2;
  const height = element.clientHeight - gridPadding * 2;
  return { width, height };
}
