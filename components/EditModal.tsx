'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReactNode, useEffect, useState } from 'react';

type Props<T> = {
    title: string;
    initial: T;
    open: boolean;
    onSave: (data: T) => void;
    onClose: () => void;
    children?: (state: T, set: React.Dispatch<React.SetStateAction<T>>) => ReactNode;
};

export default function EditModal<T extends object>({
                                                        title,
                                                        initial,
                                                        open,
                                                        onSave,
                                                        onClose,
                                                        children,
                                                    }: Props<T>) {
    const [state, setState] = useState(initial);

    useEffect(() => {
        setState(initial);
    }, [initial]);

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                {children?.(state, setState)}

                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => onSave(state)}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
