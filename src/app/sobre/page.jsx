"use client"

import Link from "next/link"
import styles from './styles.module.css'
import { useState } from "react"

export default function Page() {

    const [value, setValue] = useState(1)

    function incrementValue() {
        setValue(value + 1)
    }

    return( 
        <div>
            <h1>SOBRE</h1>
            <div className={styles.linksContainer}>
                <Link href="/">Home</Link>
                <Link href="/posts">Posts</Link>
            </div>
            <button onClick={incrementValue} className={styles.contador}>{value}</button>
        </div>
    )
}