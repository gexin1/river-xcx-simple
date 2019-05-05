const genderList = [
    {
        label: '男',
        value: 'MALE'
    },
    {
        label: '女',
        value: 'FEMALE'
    },
    {
        label: '不限',
        value: 'UNKNOWN'
    }
];

const genderToLabel = val => {
    const genderItem = genderList.find(item=>item.value === val);
    return genderItem ? genderItem.label : '';
};

export {genderToLabel};
export default genderList;
