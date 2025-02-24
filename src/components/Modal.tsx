import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

type ModalProps = {
  title?: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
function Modal({ title, open, onClose, children }: ModalProps) {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 ">
          <DialogPanel
            transition
            className="w-full max-w-3xl mt-10 rounded-lg bg-white dark:bg-sideBarBgColorDark p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <button className="bg-dividergray rounded-full p-1 absolute top-4 right-4" onClick={onClose} > <XMarkIcon className="w-5 h-5 text-black dark:text-white" /> </button>
            <DialogTitle as="h3" className="text-base/7 font-medium dark:text-white">
              {title}
            </DialogTitle>
            <div className="mt-4 h-full overflow-auto" >
                {children}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
