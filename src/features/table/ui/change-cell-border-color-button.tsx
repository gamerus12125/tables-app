"use client";
import { Button } from "@/shared/ui/ui-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/ui-dialog";
import { Input } from "@/shared/ui/ui-input";
import { useState } from "react";
import { useChangeCellBorderColor } from "../model/use-change-cell-border-color";

export const ChangeCellBorderColorButton = () => {
  const [color, setColor] = useState("");
  const { changeCellBorderColor } = useChangeCellBorderColor();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Изменить цвет выделенных ячеек</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Измениние цвета ячеек</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center gap-5">
          <Input
            onChange={(e) => setColor(e.target.value)}
            type="color"
            className="min-h-[100px]"
          />
          <DialogClose asChild>
            <Button onClick={() => changeCellBorderColor(color)}>Готово</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
