import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface GridPaginationProps {
  page: number;
  previous: boolean;
  next: boolean;
}

export default function GridPagination({
  page,
  previous,
  next,
}: GridPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={` ${!previous ? "pointer-events-none opacity-50" : ""}`}
            href={`${page === 2 ? "/" : `?page=${page - 1}`}`}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>
        <PaginationItem>
          <span className="mx-2 font-medium"> {page}</span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={` ${!next ? "pointer-events-none opacity-50" : ""}`}
            href={`?page=${next ? page + 1 : page}`}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
