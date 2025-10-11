import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface GridPaginationProps {
  page: number;
  previousDisabled: boolean;
  nextDisabled: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

export default function GridPagination({
  page,
  previousDisabled,
  nextDisabled,
  className,
}: GridPaginationProps) {
  return (
    <Pagination className={cn("flex justify-center items-center", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={` ${previousDisabled ? "pointer-events-none opacity-50" : ""}`}
            to={`${page === 2 ? "/" : `?page=${page - 1}`}`}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <span className="mx-2 font-medium"> {page}</span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={` ${nextDisabled ? "pointer-events-none opacity-50" : ""}`}
            to={`?page=${!nextDisabled ? page + 1 : page}`}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
