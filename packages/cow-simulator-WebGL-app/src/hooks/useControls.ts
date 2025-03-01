import { Controls } from "../types";
import { inputAtom } from "../store/store";
import { useCallback } from "react";
import { useLongPress } from "@custom-react-hooks/use-long-press";
import { useSetAtom } from "jotai";

const useControls = () => {
    const updateInputValue = useSetAtom(inputAtom);
    const setControl = (control: Controls, engaged: boolean) => {
        updateInputValue((prevState) => {
            const newState = { ...prevState, [control]: engaged };
            return newState;
        });
    };
    const setMobileControl = (threshold: number, control: Controls) =>
        useLongPress(
            // Memoized callback
            useCallback(() => {
                setControl(control, true);
            }, [control]),
            {
                threshold,
                onStart: useCallback(() => {
                    console.log(`onStart: ${control}`);
                    setControl(control, true);
                }, [control]),
                onFinish: useCallback(() => {
                    console.log(`onFinish: ${control}`);
                    setControl(control, false);
                }, [control]),
                onCancel: useCallback(() => {
                    console.log(`onCancel: ${control}`);
                    setControl(control, false);
                }, [control]),
            }
        );


    return { setControl, setMobileControl }
};

export default useControls;
