import React from 'react';
import { Form, Input } from "antd";
import { fromPorpertiesParseToString, fromPorpertiesParseToObject } from './utils'

const Item = Form.Item

export interface JsonFormat {
    [propName: string]: any;
}

export default function ({
    json,
    onChange
}: {
    json: JsonFormat,
    onChange: (arg: any, arg1: any) => void
}) {

    if (!json) return null
    const [formRef] = Form.useForm()
    const onValuesChange = (value:string|number) => {
        onChange(fromPorpertiesParseToObject(formRef.getFieldsValue() || {}), value)
    } 
    const formItems = fromPorpertiesParseToString(json)
    
    return <Form
        form={formRef}
        onValuesChange={onValuesChange}
        initialValues={formItems}
    >
        {
            Object.keys(formItems).map((item) => 
                <Item key={item} label={item} name={item} >
                    <Input />
                </Item>
            )
        }
    </Form>
}
