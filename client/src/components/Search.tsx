import React, { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Loading from "./ui/Loading";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>(""); // Search query state
  const [products, setProducts] = useState<any[]>([]); // Search results
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
        className="py-5"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        variant={"outline"}
        size={"icon"}
        className="border-none absolute right-1 py-1"
      >
        <BsSearch size={18} className="text-gray-400" />
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
                to={`/${product.category.name.toLowerCase()}/${product.brand.name.toLowerCase()}/${
                  product.slug
                }`}
                key={product.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  console.log(`Selected product: ${product.title}`)
                }
              >
                {product.title}
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
    </>
  );
};

export default Search;
