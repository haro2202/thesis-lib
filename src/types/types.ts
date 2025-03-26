import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Thesis {
  key: string;
  title: string;
  url: string;
  year: number;
}
