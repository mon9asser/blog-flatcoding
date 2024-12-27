import { useEffect, useState } from "react";
import Link from 'next/link';
import styles from "@/public/focus/css/admin.module.css";
import icons from "@/public/focus/icons/themify-icons/css/themify-icons.module.css";
import { ServerOffline } from "@/services/components";
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


export async function getServerSideProps(context) {

    const { res } = context;
  
    try {
        
      var request = await Helper.sendRequest({
          api: `front/admin/tutorials/get?page_number=0&records_count=1`,
          method: "get",
          data: {} 
      });
  
      if (!request.ok) {
        throw new Error('Server is offline');
      }
  
      if( request.status != 200) {
        throw new Error('Server is offline');
      }
  
      var json = await request.json(); 
      
      
      
      return {
        props: {
          upcoming: json.data ? json.data: undefined
        }
      }
  
    } catch(error) {
      return { props: { error: 'Server is offline, please try again later.' } };
    }
  
  
  }

export default function tutorials({upcoming}) {

    // server offline
    if( !upcoming || upcoming === undefined ) {
        return <ServerOffline/>
    }
    
    var [tutorials, setTutorials] = useState(upcoming); 
    var [recordsCount, setRecordsCount] = useState(1); // number of records per page
    
    var previous_record = (e) => {   
        
        e.preventDefault();

        if( tutorials.pagination.prev_page_number == tutorials.pagination.curr_page_number ) {
            return;
        } 

        load_more_records(recordsCount, tutorials.pagination.prev_page_number, "prev");

    };

    var next_record = (e) => {
        
        e.preventDefault();

        if( tutorials.pagination.next_page_number == tutorials.pagination.curr_page_number ) {
            return;
        }

        load_more_records(recordsCount, tutorials.pagination.next_page_number, "next");

    }
    
    var load_more_records = async (nRecords, nPage, btn = null, e = -1) => {
           

        if( e != -1) {
            e.preventDefault();
        }

        if( (( tutorials.pagination.prev_page_number == tutorials.pagination.curr_page_number ) && btn == "prev") || ((tutorials.pagination.next_page_number == tutorials.pagination.curr_page_number) && btn == "next") ) {
            return;
        }

        var request = await Helper.sendRequest({
            api: `front/admin/tutorials/get?page_number=${nPage}&records_count=${nRecords}`,
            method: "get",
            data: {} 
        });
    
        if (!request.ok) {
          throw new Error('Server is offline');
        }
    
        if( request.status != 200) {
          throw new Error('Server is offline');
        }
    
        var json = await request.json(); 
        console.log(json);
        if(! json.is_error) {
            setTutorials(json.data)
        }
    }

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
        // Add more rows as needed
    ];

    return <div className={styles.page}>

            <Sidebar/> 
            <AdminHeader/>

            <section className={styles['wrapper']}>
                
                {/* Headline */}
                <div className={styles['headline-titles']}>
                    <h1 className={styles['headline-title']}>Tutorials</h1>
                    <button className={styles['btn_primary']}>
                        <i className={icons['ti-plus']}></i>
                        <span>Create New</span>
                    </button>
                </div>
                {/*Statistics*/}
                <div className={styles.statistics_blocks}>
                    <ul>
                        <li>
                            <a href='#' className={styles.active}>
                                <span className={icons['ti-layers']}></span>
                                <span>
                                    <i>{Helper.formatNumber(tutorials.statistics.total_tutorials)}</i>
                                    <span>Total Tutorials</span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <span className={icons['ti-share']}></span>
                                <span>
                                <i>{Helper.formatNumber(tutorials.statistics.total_published)}</i>
                                    <span>Published</span>
                                </span>
                            </a>
                        </li> 
                        <li>
                            <a href='#'>
                                <span className={icons['ti-layout']}></span>
                                <span>
                                <i>{Helper.formatNumber(tutorials.statistics.total_draft)}</i>
                                    <span>Draft</span>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>

                

                {/*Table of tutorials*/}
                <div className={styles.tableContainer}>
                    <table className={styles.responsiveTable}>
                        <thead>
                        <tr>
                            <th className={styles['has-filter']}>
                                {/*Filters*/}
                                <a href="#"><i className={icons['ti-filter']}></i></a>
                                <span>Titles of Tutorials</span>
                            </th>
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
                <div className={styles['serial-pagination']}>
                    <ul>
                        <li><a href='#' className={tutorials.pagination.prev_page_number == tutorials.pagination.curr_page_number? styles['disabled_btn']: ''} onClick={previous_record}>Prev</a></li>
                        { 
                            tutorials.pagination.paging_serials.length ? 
                            tutorials.pagination.paging_serials.map(x => <li key={x}><a className={(tutorials.pagination.curr_page_number == (x - 1 )) ?styles['active']: ''} href='#' onClick={e => load_more_records( recordsCount,x - 1, e)}>{x}</a></li>): ''
                        }
                        <li><a href='#' className={tutorials.pagination.next_page_number == tutorials.pagination.curr_page_number? styles['disabled_btn']: ''} onClick={next_record}>Next</a></li>
                    </ul>
                    <span>
                        page {tutorials.pagination.curr_page_number + 1} of {tutorials.pagination.pages_count}
                    </span>
                </div>
            </section>
    </div>
}

