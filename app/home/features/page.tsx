"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchFeatures } from "@/lib/api";
import { Feature } from "@/lib/types";
import { FeatureCard, FeatureSearch } from "@/components/features";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default function FeaturesPage() {
  // Constants
  const ITEMS_PER_PAGE = 20;
  
  // State
  const [features, setFeatures] = useState<Feature[]>([]);
  const [filteredFeatures, setFilteredFeatures] = useState<Feature[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeatures() {
      try {
        const data = await fetchFeatures();
        setFeatures(data);
        setFilteredFeatures(data);
      } catch (err) {
        setError("Failed to load features. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadFeatures();
  }, []);

  // Reset to first page when filtered results change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredFeatures.length]);

  const handleSearchResults = (results: Feature[]) => {
    setFilteredFeatures(results);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the page for better user experience
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Calculate paginated features
  const paginatedFeatures = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFeatures.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredFeatures, currentPage, ITEMS_PER_PAGE]);

  // Calculate pagination info
  const totalPages = useMemo(() => {
    return Math.ceil(filteredFeatures.length / ITEMS_PER_PAGE);
  }, [filteredFeatures.length, ITEMS_PER_PAGE]);

  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    
    if (totalPages <= 7) {
      // If we have 7 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Add ellipsis if current page is more than 3
      if (currentPage > 3) {
        pages.push("ellipsis");
      }
      
      // Add one or two pages before current page
      const startPage = Math.max(2, currentPage - 1);
      for (let i = startPage; i < currentPage; i++) {
        pages.push(i);
      }
      
      // Add current page
      if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(currentPage);
      }
      
      // Add one or two pages after current page
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = currentPage + 1; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if current page is less than totalPages - 2
      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Features</h1>
        <p className="text-muted-foreground">
          Browse through all malware features or search for specific ones.
        </p>
      </div>
      
      {/* Search section */}
      <div className="w-full max-w-2xl">
        <FeatureSearch features={features} onSearchResults={handleSearchResults} />
      </div>

      {/* Features grid */}
      <div className="flex flex-1 flex-col gap-6">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <Skeleton key={index} className="h-[200px] w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="flex h-40 items-center justify-center rounded-lg bg-muted/50">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : filteredFeatures.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg bg-muted/50">
            <p className="text-muted-foreground">No features found matching your search.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedFeatures.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {/* Previous button */}
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                      href="#"
                    />
                  </PaginationItem>
                  
                  {/* Page numbers */}
                  {pageNumbers.map((page, i) => (
                    <PaginationItem key={i}>
                      {page === "ellipsis" ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          href="#"
                          isActive={page === currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  
                  {/* Next button */}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                      href="#"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  );
}
