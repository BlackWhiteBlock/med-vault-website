import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type LaunchNoticeContextValue = {
  showLaunchNotice: () => void;
};

const LaunchNoticeContext = createContext<LaunchNoticeContextValue | null>(null);

export function LaunchNoticeProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const showLaunchNotice = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ showLaunchNotice }), [showLaunchNotice]);

  return (
    <LaunchNoticeContext.Provider value={value}>
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="border-slate-200 bg-white text-slate-900 sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">敬请期待</AlertDialogTitle>
            <AlertDialogDescription className="text-base text-slate-600">
              免费内测即将开始，请关注我们，获取免费的会员资格。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setOpen(false)}
            >
              好的
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </LaunchNoticeContext.Provider>
  );
}

export function useLaunchNotice() {
  const ctx = useContext(LaunchNoticeContext);
  if (!ctx) {
    throw new Error("useLaunchNotice must be used within LaunchNoticeProvider");
  }
  return ctx;
}
