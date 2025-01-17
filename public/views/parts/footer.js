import style from "@/app/styles.module.css";
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {SubscribeComponents} from '../services/components';

export default function Footer({settings, menus}) {
      
    var { company_links, follow_links, nav_links } = menus;

    var site_url = settings.site_address;

    return(
        <footer className={`${style.wrapper} ${style['white-bg']} ${style['plr-0']} ${style.footer}`}>
        <div className={`${style.wrapper} ${style['offset-left']} ${style['offset-right']} ${style['plr-15']} ${style['max-1170']} ${style['ptb-25']}`}>
          <div className={`${style.row} ${style['mlr--15']}`}>
            {company_links.length ? (
              <div className={`${style['lg-2']} ${style['md-3']} ${style['sm-6']} ${style['plr-15']} ${style['ptb-15']}`}>
                <h2 className={`${style.title}`}>Company</h2>
                <ul className={`${style['block-list']} ${style['custom-widget-links']} ${style['font-14']} ${style['no-borders-list']} ${style['no-effect']}`}>
                  {company_links.map(x => (
                    <li key={x._id}>
                      <Link target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                        {x.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
      
            {follow_links.length ? (
              <div className={`${style['lg-2']} ${style['md-3']} ${style['sm-6']} ${style['plr-15']} ${style['ptb-15']}`}>
                <h2 className={`${style.title}`}>Follow Us</h2>
                <ul className={`${style['block-list']} ${style['custom-widget-links']} ${style['font-14']} ${style['no-borders-list']} ${style['no-effect']}`}>
                  {follow_links.map(x => (
                    <li key={x._id}>
                      <Link target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                        {x.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
      
            {nav_links.length ? (
              <div className={`${style['lg-4']} ${style['md-6']} ${style['plr-15']} ${style['ptb-15']}`}>
                <h2 className={`${style.title}`}>Tags</h2>
                <ul className={`${style['inline-list']} ${style['tag-list']} ${style['custom-widget-links']} ${style['font-14']} ${style['no-borders-list']} ${style['no-effect']} ${style['flex-wrap']}`}>
                  {nav_links.map(x => (
                    <li key={x._id}>
                      <Link target={x.openInNewTab ? "_blank" : ""} href={x.link}>
                        {x.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
      
            <div className={`${style['lg-4']} ${style['md-6']} ${style['plr-15']} ${style['ptb-15']}`}>
              <SubscribeComponents
                is_footer={true}
                settings={settings}
                title={settings.subscribe_title}
                description={settings.subscribe_description}
              />
            </div>
          </div>
        </div>
      </footer>      
    )
    
}