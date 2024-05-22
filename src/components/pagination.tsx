import React from 'react';
import { ArrowLeftToLineIcon, ArrowRightToLineIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from './ui/button';

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
    <div className="flex items-center justify-around px-2 mt-4">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
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
