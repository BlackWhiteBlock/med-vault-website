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

type NoticeKind = "launch" | "partner";

type LaunchNoticeContextValue = {
  showLaunchNotice: () => void;
  showPartnerNotice: () => void;
};

const LaunchNoticeContext = createContext<LaunchNoticeContextValue | null>(null);

const noticeCopy: Record<
  NoticeKind,
  { title: string; description: React.ReactNode; qrSrc: string; qrAlt: string; hint: string }
> = {
  launch: {
    title: "添加医案通官方客服",
    description: "添加医案通官方客服，领取免费的会员资格，提前体验医案通。",
    qrSrc: "/images/wechat-cs-qr.png",
    qrAlt: "医案通官方客服微信二维码",
    hint: "微信扫码咨询客服",
  },
  partner: {
    title: "合作咨询",
    description: (
      <>
        如需商务合作，请扫码添加下方客服，或发送合作邮件至{" "}
        <a
          href="mailto:med-vault@chainvk.com"
          className="font-medium text-[#2D6EF7] hover:underline"
        >
          med-vault@chainvk.com
        </a>
        ，我们会尽快回复您。
      </>
    ),
    qrSrc: "/images/wechat-partner-qr.png",
    qrAlt: "医案通合作咨询微信二维码",
    hint: "微信扫码咨询合作",
  },
};

export function LaunchNoticeProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<NoticeKind>("launch");

  const showLaunchNotice = useCallback(() => {
    setKind("launch");
    setOpen(true);
  }, []);

  const showPartnerNotice = useCallback(() => {
    setKind("partner");
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({ showLaunchNotice, showPartnerNotice }),
    [showLaunchNotice, showPartnerNotice],
  );

  const copy = noticeCopy[kind];

  return (
    <LaunchNoticeContext.Provider value={value}>
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="border-slate-200 bg-white text-slate-900 sm:max-w-md">
          <AlertDialogHeader className="sm:text-center">
            <AlertDialogTitle className="text-slate-900 text-xl">{copy.title}</AlertDialogTitle>
            <AlertDialogDescription className="text-base text-slate-600 leading-relaxed">
              {copy.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col items-center gap-3 py-1">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 shadow-sm">
              <img
                src={copy.qrSrc}
                alt={copy.qrAlt}
                className="h-56 w-56 object-contain"
                draggable={false}
              />
            </div>
            <p className="text-sm text-slate-500">{copy.hint}</p>
          </div>

          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              className="bg-[#2D6EF7] text-white hover:bg-[#255ED9] min-w-28"
              onClick={() => setOpen(false)}
            >
              我知道了
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
