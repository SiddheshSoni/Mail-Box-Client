
const BASE_URL = `https://ecommerce-site-9c080-default-rtdb.asia-southeast1.firebasedatabase.app/`;

const RequestWrapper = async (path = 'mails.json', { method= 'GET', body = null} ={})=>{
    const url = `${BASE_URL}${path}`;
    const options = {
        method,
        headers:{ 'Content-Type':'application/json'},
    };

    if(body){
        options.body = JSON.stringify(body);
    }

    try{
        const res = await fetch(url, options);
        const data = await res.json();

         if(res.ok){
            return { ok: true, data: data };
        }else{
            let errorMessage = "Failed";
            if(data && data.error && data.error.message){
                errorMessage = data.error.message;
            }
            return { ok: false, error: errorMessage };
        }

    }catch(err){
        console.log(err);
    };
};


const sendMail = async (mail) => {
    const recipientKey = mail.to.replace(/[.#$[\]]/g, "_");

    return await RequestWrapper(`mails/${recipientKey}.json`,{method:'POST', body: mail});
};

const getMail = async () => {
    const userKey = localStorage.getItem("user");
    return await RequestWrapper(`mails/${userKey}.json`,{method:'GET'});
};

const DeleteMail = async (id) =>{
    const userKey = localStorage.getItem("user");
    return await RequestWrapper(`mails/${userKey}/${id}.json` ,{ method:'DELETE'});
}

const UpdateMail = async (id, update={isRead: true}) =>{
    const userKey = localStorage.getItem("user");
    return await RequestWrapper(`mails/${userKey}/${id}.json` ,{ method:'PATCH', body: update})
}

export {sendMail, getMail, DeleteMail, UpdateMail};