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
  id: string;
  name: string;
}
export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: function Cell({ row }) {
      const cate = row.original;
      return <span className="line-clamp-1 max-sm:text-xs">{cate?.id}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: function Cell({ row }) {
      const cate = row.original;
      const getName = cate.name;
      return (
        <p className="line-clamp-1 max-sm:text-xs bg-muted p-1 text-center rounded-full">
          {getName}
        </p>
      );
    },
  },

  {
    accessorKey: "Action",
    header: "Action",

    id: "actions",
    cell: function Cell({ row }) {
      const cate = row.original;
      const [open, setOpen] = useState(false);
      const onDelete = async () => {
        setOpen(false);
        try {
          const response = await fetch(
            `https://fascobackend-production.up.railway.app/api/categories/${cate.id}`,
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
              title: "Category Deleted",
              description: "Category deleted successfully",
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
                    to={"/cate/[id]"}
                    state={`/cate/${cate.id}`}
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
