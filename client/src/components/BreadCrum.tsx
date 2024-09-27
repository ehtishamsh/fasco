import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

export function BreadCrum({
  cat,
  brand,
  productName,
}: {
  cat?: string;
  brand?: string;
  productName?: string;
}) {
  const camelCaseCat = cat
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to={`/shop/${cat?.toLowerCase()}`}>{camelCaseCat}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {brand && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link
                  to={`/shop/${cat?.toLowerCase()}?brand=${brand.toLowerCase()}`}
                >
                  {brand}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {productName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{productName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
