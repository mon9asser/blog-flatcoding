import { useEffect } from "react";
import Link from 'next/link';
import styles from "@/public/focus/css/admin.module.css";
import icons from "@/public/focus/icons/themify-icons/css/themify-icons.module.css";
  
import { Helper } from "../../services/helper";
import Cookies from "js-cookie";
import Image from "next/image";
import siteLogo from "../../public/img/logo-white.webp";
import { Sidebar } from "@/parts/sidebar";
import AdminHeader from "@/parts/admin.header";
/* 
    List of statistics
    Filter tutorials
    Table contains all tutorials by show latest 6 updated tutorials
    Pagination with numerical
*/ 



export default function tutorials() {

    const data = [
        {
        id: 1,
        customer: "Zinzu Chan Lee",
        location: "Seoul",
        orderDate: "17 Dec, 2022",
        status_code: "published",
        status: "published",
        amount: "$128.90",
        },
        {
        id: 2,
        customer: "Jeet Saru",
        location: "Kathmandu",
        orderDate: "27 Aug, 2023",
        status_code: "declined",
        status: "declined",
        amount: "$5350.50",
        },
        {
        id: 2,
        customer: "Jeet Saru",
        location: "Kathmandu",
        orderDate: "27 Aug, 2023",
        status_code: "draft",
        status: "draft",
        amount: "$5350.50",
        },
        {
        id: 2,
        customer: "Jeet Saru",
        location: "Kathmandu",
        orderDate: "27 Aug, 2023",
        status_code: "pending-review",
        status: "pending review",
        amount: "$5350.50",
        },
        // Add more rows as needed
    ];

    return <>

            <Sidebar/> 
            <AdminHeader/>

            <section className={styles['wrapper']}>
                
                {/*Statistics*/}
                <div className={styles.statistics_blocks}>
                    <ul>
                        <li>
                            <i>Total Tutorials</i>
                        </li>
                        <li>
                            <i>Published</i>
                        </li>
                        <li>
                            <i>Pending Review</i>
                        </li>
                        <li>
                            <i>Draft</i>
                        </li>
                    </ul>
                </div>

                {/*Filters*/}
                {/*Table of tutorials*/}
                <div className={styles.tableContainer}>
                <table className={styles.responsiveTable}>
                    <thead>
                    <tr>
                        <th>Titles of Tutorials</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Last Update</th>
                        <th>Quality</th>
                        <th>Statistics</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <tr className={styles['td-of-tble']} key={row.id}>
                            
                        <td>
                            <span>{row.customer}</span>
                            <ul>
                                <li>
                                    <a>25 Posts</a>
                                </li>
                                <li>
                                    <a data-color="blue">Edit</a>
                                </li>
                                <li>
                                    <a data-color="red">Delete</a>
                                </li>
                                <li>
                                    <a data-color="blue">Preview</a>
                                </li>
                            </ul>
                        </td>
                        <td>{row.location}</td>
                        <td className={styles[row.status_code]}>
                            <span>{row.status}</span>
                        </td>
                        <td>{row.orderDate}</td>
                        <td>medium</td>
                        
                        <td>{row.amount}</td>
                        </tr>
                    ))}
                    </tbody>
                    <thead>
                    <tr>
                        <th>Titles of Tutorials</th>
                        <th>Category</th>
                        <th>Statistics</th>
                        <th>Status</th>
                        <th>Quality</th>
                        <th>Last Update</th>
                    </tr>
                    </thead>
                </table>
                </div>
                {/*Paginations*/}
            </section>
    </>
}