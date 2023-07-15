import { IconButton, Tooltip } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Palette, Share, Visibility } from "@mui/icons-material";
import { atom, useRecoilState } from "recoil";
import { useState } from "react";
import DashboardTabs from "./DashboardTabs";

export const formTitleAtom = atom<string>({
    key: 'formTitleAtom',
    default: 'Untitled Form'
})

function CreateForm() {
    const [title, setTitle] = useRecoilState(formTitleAtom);
    const [showThemeSidebar, setShowThemeSidebar] = useState(false);
    
    return (
        <div className=" h-screen flex flex-col items-center">
            <div className="border-b-2 shadow-[0_4px_24px_rgba(0,0,0,0.1)] w-screen bg-white py-10 flex justify-between">
                <div className="flex gap-6 px-8">
                    <Tooltip title="Add a question" placement="top">
                        <IconButton
                            size="medium"
                            aria-label="back"
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Tooltip>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Untitled Form"
                        className="box-border border-b-2 border-white h-8 focus:outline-none focus:border-b-2 focus:border-blue-500 px-2 py-2" />
                </div>
                <div className="flex gap-4 px-8">
                    <IconButton
                        size="medium"
                        aria-label="back"
                        onClick={() => setShowThemeSidebar(!showThemeSidebar)}
                    >
                        <Palette />
                    </IconButton>
                    <IconButton
                        size="medium"
                        aria-label="back"
                    >
                        <Visibility />
                    </IconButton>
                    <IconButton
                        size="medium"
                        aria-label="back"
                    >
                        <Share />
                    </IconButton>
                </div>
            </div>
            <div className="flex-grow flex overflow-y-auto w-screen pb-24">
                <DashboardTabs />
            </div>
        </div>
    )
}

export default CreateForm