'use strict';

import m from 'mithril';
import {format} from "date-fns";
import './top-referrers.css';
import api from '../util/api.js';

function Component() {
    let startDate = null;
    let endDate = null;
    let items = [];

    const fetch = function(s, e) {
        if (startDate !== null && endDate !== null && s.getTime() === startDate.getTime() && e.getTime() === endDate.getTime()) {
            return;
        }

        startDate = s;
        endDate = e;
        api.request(`/referrers?start_date=${format(s, 'yyyy-MM-dd')}&end_date=${format(e, 'yyyy-MM-dd')}`)
            .then(p => {
                items = p;
            });
    };

    return {
        view(vnode) {
            fetch(vnode.attrs.startDate, vnode.attrs.endDate);
            return (
                    <div className={"box top-referrers"}>
                            <div className="box-grid head">
                                <div className={""}>Referrers</div>
                                <div className={"amount-col"}>Visitors</div>
                                <div className={"amount-col"}>Pageviews</div>
                            </div>
                            <div className={"body"}>
                            {items.map(p => (
                                <div key={p.id} className={"box-grid"}>
                                    <div><a href={p.url}>{p.url}</a></div>
                                    <div className={"amount-col"}>{Math.max(p.visitors, 1)}</div>
                                    <div className={"amount-col"}>{p.pageviews}</div>
                                </div>
                            ))}
                            {items.length === 0 && (<div>There's nothing here, yet!</div>)}
                            </div>
                    </div>
            )
        }
    }
}

export default Component;
