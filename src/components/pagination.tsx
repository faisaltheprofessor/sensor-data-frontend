import React from 'react';
import { ArrowLeftToLineIcon, ArrowRightToLineIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Props {
  next?: string;
  previous?: string;
  first?: string;
  last?: string;
  perPage?: number;
  totalPages?: number;
  currentPage?: number;
  action: CallableFunction;
}

const Pagination = ({ next, previous, first, last, perPage, totalPages, currentPage, action }: Props) => {

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Prevent out-of-bounds navigation
    action(perPage, pageNumber);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex items-center justify-around px-2 mt-4 pb-12">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${perPage}`}
                        onValueChange={(value) => {
                            action(value, 1);
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder="selecting" />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

          {/* Button for first page */}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={isFirstPage}
          >
            <span className="sr-only">Go to first page</span>
            <ArrowLeftToLineIcon className="h-4 w-4" />
          </Button>
          {/* Button for previous page */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={isFirstPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {`Page ${currentPage} of ${totalPages}`}
        </div>
        <div className="flex items-center space-x-2">
          {/* Button for next page */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isLastPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          {/* Button for last page */}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(totalPages)}
            disabled={isLastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ArrowRightToLineIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
