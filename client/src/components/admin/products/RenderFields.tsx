import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categoryFields } from "./ProductFields";
import { Checkbox } from "@/components/ui/checkbox";

export const renderCategoryFields = (
  categoryName: keyof typeof categoryFields,
  form: any
) => {
  if (!categoryFields[categoryName]) return null;

  return categoryFields[categoryName].map(
    ({ name, label, placeholder = "", type }) => {
      return (
        <div key={name}>
          {type === "input" ? (
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={placeholder}
                      value={field.value ?? ""}
                      type={type}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-2">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )}
          <DropdownMenuSeparator />
        </div>
      );
    }
  );
};
