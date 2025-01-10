'use client';

import { setCookie } from "cookies-next";
import { useState } from "react";

interface Props {
    currentTab?: number;
    tabOptions?: number[];
}

export const TabBar = ({ currentTab, tabOptions = [1,2,3,4] }: Props) => {

    const [selected, setSeleted] = useState( currentTab );

    const onTabSelected = ( tab: number ) => {
        setSeleted( tab );
        setCookie('selectedTab', tab.toString());
    }

    return (
        <div className={
            `grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${ 'grid-cols-' + tabOptions.length }`
        }>

            {
                tabOptions.map(tap =>
                    <div key={ tap }>
                        <input 
                            type="radio" 
                            id={ tap.toString() }
                            onChange={() => {}}
                            checked={ selected === tap } 
                            className="peer hidden" />
                        <label
                            onClick={() => onTabSelected( tap ) } 
                            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                            { tap }
                        </label>
                    </div>
                )
            }
        </div>

    );
}