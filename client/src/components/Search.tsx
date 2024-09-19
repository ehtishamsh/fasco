import React, { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Loading from "./ui/Loading";
import { Product } from "@/lib/redux/types";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>(""); // Search query state
  const [products, setProducts] = useState<Product[]>([]); // Search results
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // Dropdown visibility state
  const [isFetching, setIsFetching] = useState<boolean>(false); // Loading state for request
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown container
  const delayRef = useRef<NodeJS.Timeout | null>(null); // Ref to track delay timer

  // Fetch products based on query
  const fetchProducts = async (searchQuery: string) => {
    try {
      setIsFetching(true); // Set loading state to true
      const response = await fetch(
        `http://localhost:4000/api/products/search/${searchQuery}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setProducts(data.data); // Set the products data
      setIsFetching(false); // Reset loading state after fetch
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsFetching(false);
    }
  };
  useEffect(() => {
    // Clear previous timeout when query changes
    if (delayRef.current) {
      clearTimeout(delayRef.current);
    }

    // Only make request if query has more than 2 characters
    if (query.length > 2) {
      // Add a delay before sending request (e.g., 500ms)
      delayRef.current = setTimeout(() => {
        fetchProducts(query);
        setShowDropdown(true); // Show dropdown after results are fetched
      }, 500); // Adjust delay as needed
    } else {
      setShowDropdown(false); // Hide dropdown if query is cleared or too short
    }

    // Cleanup timeout on component unmount or when query changes
    return () => {
      if (delayRef.current) {
        clearTimeout(delayRef.current);
      }
    };
  }, [query]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Input
        type="text"
        className="py-5 max-sm:py-3 max-sm:rounded-full"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        variant={"link"}
        size={"icon"}
        className="border-none absolute right-1 py-1 max-sm:p-0 max-sm:bg-transparent max-sm:rounded-full"
      >
        <BsSearch className="text-gray-400 max-sm:text-base" />
      </Button>

      {showDropdown && products.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 w-full bg-white shadow-lg max-h-64 overflow-y-auto rounded-lg z-10"
        >
          <div className="w-full h-full flex flex-col gap-2">
            {products.map((product) => (
              <Link
                reloadDocument
                to={`/${
                  typeof product.category === "object" &&
                  product.category.name.toLowerCase()
                }/${
                  typeof product.brand === "object" &&
                  product.brand.name.toLowerCase()
                }/${product.slug}`}
                key={product.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                onClick={() =>
                  console.log(`Selected product: ${product.title}`)
                }
              >
                <span>
                  <img
                    className="col-span-1 w-10 h-10 object-contain"
                    src={"http://localhost:4000" + product.cover}
                  />
                </span>
                <span className="col-span-3 text-sm font-semibold text-gray-600">
                  {product.title}
                </span>
              </Link>
            ))}
          </div>
          {/* Optional loading spinner or text */}
          {isFetching && (
            <div className="py-6">
              <Loading />
            </div>
          )}
        </div>
      )}
      {showDropdown && products.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 w-full bg-white shadow-lg max-h-64 overflow-y-auto rounded-lg z-10"
        >
          <div className="w-full h-full flex flex-col gap-2">
            <span className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs text-gray-400 flex items-center justify-center gap-2">
              No products found
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
