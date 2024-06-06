import AlertDelete from "../AlertDelete";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Product } from "@/lib/redux/types";
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Cover",
    cell: function Cell({ row }) {
      const product = row.original;
      return (
        <img
          src={product.thumbnail}
          className="max-w-40 max-sm:max-w-20 border border-border rounded-lg"
          alt="cover image"
        />
      );
    },
  },
  {
    accessorKey: "Title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: function Cell({ row }) {
      const product = row.original;
      const getName = product.title;
      return (
        <p className="line-clamp-1 max-sm:text-xs bg-muted p-1 text-center rounded-full">
          {getName}
        </p>
      );
    },
  },
  {
    accessorKey: "Category",
    header: "Category",

    cell: function Cell({ row }) {
      const product = row.original;
      return <p className="line-clamp-1 max-sm:text-xs">{product?.category}</p>;
    },
  },

  {
    accessorKey: "Brand",
    header: "Brand",

    cell: function Cell({ row }) {
      const product = row.original;
      return <p className="line-clamp-1 max-sm:text-xs">{product?.brand}</p>;
    },
  },
  {
    accessorKey: "Price",
    header: "Price",

    cell: function Cell({ row }) {
      const product = row.original;
      return <p className="line-clamp-1 max-sm:text-xs">{product?.price}</p>;
    },
  },
  {
    accessorKey: "Stock",
    header: "Stock",

    cell: function Cell({ row }) {
      const product = row.original;
      return <p className="line-clamp-1 max-sm:text-xs">{product?.stock}</p>;
    },
  },
  {
    accessorKey: "Action",
    header: "Action",

    id: "actions",
    cell: function Cell({ row }) {
      const product = row.original;
      const [open, setOpen] = useState(false);
      const onDelete = async () => {
        try {
          const response = await fetch("https://dummyjson.com/products", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: product.id }),
          });

          if (response.ok) {
            setOpen(false);
            toast({
              title: "product deleted",
              description: "product deleted successfully",
            });
          } else {
            throw new Error("Failed to delete product");
          }
        } catch (error) {
          console.error(error);
          setOpen(false);
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      };
      return (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    to={"/product/[id]"}
                    state={`/product/${product.id}`}
                    className="flex gap-4"
                  >
                    <Eye className="mr-1 h-5 w-5" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={`cursor-pointer`}>
                  <DialogTrigger className="flex gap-4">
                    <Trash className="mr-1 h-5 w-5" />
                    Delete
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDelete onConfirm={onDelete} />
          </Dialog>
        </>
      );
    },
  },
];
