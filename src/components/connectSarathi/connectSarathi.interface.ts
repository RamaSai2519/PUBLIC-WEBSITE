export interface ConnectSarathiTypes {
  image: string;
  title: string;
  stars: string;
  type?: "gk" | "entertainment" | "culture";
  reviews: number;
  buttonText?: string;
  isDisabled?: boolean;
  isPaid?: boolean;
  href?: string;
  description: string;
  game?: boolean;
}
