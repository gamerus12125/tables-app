"use client"
import { Button } from "@/shared/ui/ui-button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/ui-dialog";
import { Input } from "@/shared/ui/ui-input";
import { useState } from "react";
import { useEditTable } from "../model/use-edit-table";
import { useSession } from "next-auth/react";

export const EditTableButton = ({tableId}: { tableId: number }) => {
    const [title, setTitle] = useState("")
    const {editTable} = useEditTable()
    const session = useSession()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Изменить таблицу</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Изменение таблицы</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center items-center gap-5">
                <Input disabled={session.status === "loading" || session.status === "unauthenticated"} type="text" placeholder="Название таблицы" onChange={(e) => setTitle(e.target.value)}/>
                    <DialogClose asChild>
                        <Button onClick={() => editTable(title, tableId)}>Готово</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}