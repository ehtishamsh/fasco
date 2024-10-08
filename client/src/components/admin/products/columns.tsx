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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
interface Data {
  cover: string;
  title: string;
  category: string;
  variants: [
    {
      name: string;
      price: string;
    }
  ];
  colors: [
    {
      name: string;
    }
  ];

  price: number;
  stock: number;
  description: string;
  id: string;
  brand: string;
}
export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "image",
    header: "Cover",
    cell: function Cell({ row }) {
      const product = row.original;
      return (
        <img
          src={`https://fascobackend-production.up.railway.app${product?.cover}`}
          className="max-w-20 max-sm:max-w-20 border border-border rounded-lg"
          alt="cover image"
        />
      );
    },
  },
  {
    accessorKey: "title",

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
      return <p className="line-clamp-1 max-sm:text-xs">${product?.price}</p>;
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
    accessorKey: "variant",
    header: "Variants",

    cell: function Cell({ row }) {
      const product = row.original;
      return (
        <p className="line-clamp-1 max-sm:text-xs flex flex-col gap-1 justify-center items-center">
          {product?.variants.map((item: any) => {
            return (
              <span>
                ({item.name}, ${item.price})
              </span>
            );
          })}
        </p>
      );
    },
  },
  {
    accessorKey: "colors",
    header: "Colors",

    cell: function Cell({ row }) {
      const product = row.original;
      return (
        <p className="line-clamp-1 max-sm:text-xs flex flex-col gap-1 justify-center items-center">
          {product.colors.map((item: any) => {
            return (
              <span
                className={`w-4 h-4 rounded-full border border-muted-foreground`}
                style={{ backgroundColor: item.name }}
              >
                &nbsp;
              </span>
            );
          })}
        </p>
      );
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
        setOpen(false);
        try {
          const response = await fetch(
            `https://fascobackend-production.up.railway.app/api/products/${product.id}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();
          if (data.status === 200) {
            window.setTimeout(() => {
              window.location.reload();
            }, 2000);
            toast({
              title: "Product Deleted",
              description: "Product deleted successfully",
              variant: "success",
            });
          }
        } catch (error) {
          console.log(error);
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
                    to={`/admin/products/${product.id}`}
                    className="flex gap-4"
                  >
                    <Eye className="mr-1 h-5 w-5" />
                    Edit
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
