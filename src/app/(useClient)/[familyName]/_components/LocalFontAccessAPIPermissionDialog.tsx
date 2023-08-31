"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import validFontFamilies from "../../../../recoil/validFontFamilies";

export default function LocalFontAccessAPIPermissionDialog() {
  const router = useRouter();
  const [validFamilies, setValidFamilies] = useRecoilState(validFontFamilies);
  const permitRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(validFamilies.length === 0);
  const onClose = () => {
    setIsOpen(false);
  };

  const setLocalFontList = useCallback(async () => {
    console.log("set");
    if (validFamilies.length === 0) {
      const families = await window
        .queryLocalFonts()
        .then((fontData) => fontData.map((v) => v.family));

      setValidFamilies(families);
    }
  }, [setValidFamilies, validFamilies.length]);

  const onDisallowed = () => {
    router.replace("/");
  };

  const onGranted = async () => {
    const families = await window.queryLocalFonts();
    // queryLocalFontsの結果がからの配列である場合、apiの使用が許可されなかったと考える
    if (families.length === 0) router.replace("/NeedUserActivation");
    await setLocalFontList();
    onClose();
  };

  useLayoutEffect(() => {
    /* --- apiの存在確認 --- */
    if (!("queryLocalFonts" in window)) router.replace("/InvalidEnvironment");

    /* --- apiの許可状態確認 --- */
    /*
    apiが許可されている場合：ローカルのフォントファミリーを取得
    apiが許可されていない場合：エラーページへ遷移
    ユーザーによる確認が必要な場合：ダイアログを表示
     */
    (async () => {
      const { state } = await navigator.permissions.query({
        name: "local-fonts",
      });
      if (state === "denied") {
        router.replace("/NeedUserActivation");
      }
      if (state === "granted") {
        setIsOpen(false);
        await setLocalFontList();
      }
    })();
  }, [router, setLocalFontList]);

  return (
    <AlertDialog
      leastDestructiveRef={permitRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            ローカルフォントへのアクセスを許可
          </AlertDialogHeader>
          <AlertDialogBody>
            本Webアプリを使うには、ローカルフォントへのアクセスを許可する必要があります。
          </AlertDialogBody>
          <AlertDialogFooter>
            <HStack>
              <Button ref={permitRef} onClick={onGranted}>
                許可
              </Button>
              <Button onClick={onDisallowed}>不許可</Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
