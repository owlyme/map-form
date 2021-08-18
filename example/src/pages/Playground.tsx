import MapForm from "map-form"

export default function Playground(props) {
    const onchange = (formData, changeValue) => {
        console.log(formData, changeValue)
    }
    return <MapForm json={{
        // a: 1,
        // b: {
        //     c: 1,
        //     d: 1,
        //     bb: {
        //         cc: 'cc'
        //     }
        // },
        f: [ 1, 
            {
            ff: 123
        },
        [3,4, {
            hh: 123
        }]
    ]
    }} onChange={onchange}/>
};
