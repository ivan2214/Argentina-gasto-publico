import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
interface BreadCrumbDynamicProps {
  links: { label: string; href: string }[];
}

export const BreadCrumbDynamic: React.FC<BreadCrumbDynamicProps> = ({
  links,
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
            {index !== links.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
