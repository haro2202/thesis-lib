import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Thesis = {
  key: string;
  title: string;
  url: string;
  year: number;
};
