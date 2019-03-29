/**
 * Created by hea on 3/21/19.
 */
export const constant = {
    route: [
        {name: 'dashboard', url:'/dashboard', displayName: 'DASHBOARD'},
        {name: 'myCruise', url:'/mycruise', displayName: 'MY CRUISE'},
        {name: 'agents', url:'/agents', displayName: 'AGENTS', default: true},
        {name: 'help', url:'/help', displayName: 'HELP'}
    ],
    header: {
        title: 'Cruise',
        signInPrefix: 'Signed in as',
        member: 'Member',
        signOut: 'Sign out'
    },
    agents: {
        filter: ['All', 'Physical', 'Virtual'],
        items:[
            {
                url: 'bjstdmngbgr02.thoughtworks.com',
                status: 'idle',
                ip: '192.168.1.2',
                path:'/var/lib/cruise-agent',
                resources: ['ubuntu', 'firefox3', 'core-duo'],
                category: 'Physical'
            },
            {
                url: 'bjstdmngbgr03.thoughtworks.com',
                status: 'building',
                ip: '192.168.1.3',
                path:'/var/lib/cruise-agent',
                resources: ['ubuntu', 'firefox3', 'mysql', 'core-duo'],
                category: 'Physical'
            },
            {
                url: 'bjstdmngbgr04.thoughtworks.com',
                status: 'building',
                ip: '192.168.1.4',
                path:'/var/lib/cruise-agent',
                resources: ['ubuntu', 'firefox3', 'mysql', 'core-duo'],
                category: 'Physical'
            },
            {
                url: 'bjstdmngbgr05.thoughtworks.com',
                status: 'idle',
                ip: '192.168.1.5',
                path:'/var/lib/cruise-agent',
                resources: ['ubuntu'],
                category: 'Physical'
            }

        ]
    }
};