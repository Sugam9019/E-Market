from flask import Flask,render_template,request
from flask_cors import CORS,cross_origin
import mysql.connector

from datetime import datetime


app=Flask(__name__)
CORS(app)


#------------------------------------------------------------------------------------------------




try:
    db_connect = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root123",
        database="e_commerce"
    )
    cursor = db_connect.cursor()
except Exception as e:
    print(e)



def db_insert(data):
    # db_connect()
    cursor.execute("insert into user_data(Name,Email,Password,P_number) values('"+data['name']+"','"+data['email']+"','"+data['password']+"','"+data['p_number']+"') ")
    db_connect.commit()
    # db_connect.close()
    return 


def db_read(data):
    # db_connect()
    cursor.execute("select * from user_data where Name='"+data['name']+"' and Email='"+data['email']+"' and Password='"+data['password']+"' ")
    result=cursor.fetchall()
    # db_connect.close()
    return result


def product_insert(product):
    if(len(product)==5):
        cursor.execute("insert into products values('"+product['category']+"','"+product['product_name']+"','"+product['product_link']+"','"+product['product_price']+"','"+product['product_Id']+"')")
        db_connect.commit()
    return
    
    
def insert_cart(product):
    cursor.execute("insert into user_cart values('"+product['email']+"','"+product['product_id']+"')")
    db_connect.commit()
    return


def cart_search(data):
    cursor.execute("select id from user_cart where email = '"+str(data["email_id"])+"' ")
    result=cursor.fetchall()
    return result


def remove_cart(data):
    cursor.execute("delete from user_cart where id= '"+data['id']+"' and email='"+data['email']+"'  ")
    db_connect.commit()
    return 


def purchase_data_insert(data):

    cursor.execute(" SELECT count(*) FROM user_purchases ")
    before_count=cursor.fetchall()

    now = datetime.now()
    dt = now.strftime("%d/%m/%Y %H:%M:%S")
    
    values=data["purchase_data"]

    cursor.execute("insert into user_purchases values('"+values[0]+"','"+values[1]+"','"+values[3]+"','"+values[2]+"','"+str(dt)+"','"+values[5]+"','"+values[6]+"') ")
    db_connect.commit()

    cursor.execute(" SELECT count(*) FROM user_purchases ")
    after_count=cursor.fetchall()


    if(after_count>before_count):
        return "success"
    else:
        return "failuer"
    

def send_mail(data):

    values=data["purchase_data"]
    to_mail=values[1]
    body="Name : "+values[0]+"\n Phon_number : "+values[3]+"\n Address : "+values[2]+"\n Product_Name : "+values[5]+"\nProduct_Price : "+str(values[6]).replace("₹","")

    # import smtplib
    # server=smtplib.SMTP('smtp.gmail.com',587)
    # server.starttls()
    # server.login('sugamn1ga20cs184@gmail.com','xahr dmdh lcje cmsx')
    # server.sendmail('sugamn1ga20cs184@gmail.com',str(to_mail),str(body) )

    import smtplib
    from email.message import EmailMessage
    msg=EmailMessage()
    msg.set_content(body)
    msg['subject']="purchase confirmation"
    msg['to']=to_mail
    msg['from']="sugamn1ga20cs184@gmail.com"


    server=smtplib.SMTP('smtp.gmail.com',587)
    server.starttls()
    server.login('sugamn1ga20cs184@gmail.com','xahr dmdh lcje cmsx')
    server.send_message(msg)
    server.quit()


#---------------------------------------------------------------------------------



@app.route("/")
def main():
    return " SERVER IS RUNNING"



@app.route("/register",methods=['GET','POST'])
def register():
    if(request.method=="POST"):
        data=request.get_json()
        db_insert(data)
        return {"status":"received"}
    
    return {"status":"failed"}



@app.route("/login",methods=['GET','POST'])
def login():
     if(request.method=="POST"):
        login_data=request.get_json()
        # print(login_data)
        response=db_read(login_data) 
        # print(response)
        if(response):
            return {"status":"success"}
        else:
            return {"status":"failed"}
            
     return {"status":"failed"}
    


@app.route("/seller")
def seller():
    return render_template("./seller.html")



@app.route("/add_seller_products",methods=['GET','POST'])
def register_product():
    if(request.method=="POST"):
        product=request.form
        print((product))
        product_insert(product)

    
    return render_template("./seller.html",result="insertion was success..")



@app.route("/search_products",methods=['GET','POST'])
def search():
    if(request.method=="POST"):
        product=request.get_json()
        # print(product)
        cursor.execute("select * from products where name like '"+product['product_name']+"' ")
        result=cursor.fetchall()
        # print(list(result),len(result))
        if(len(result)>0):
            return {"product_details":result}
        else:   
            return {"status":"failed"}
    return {"status":"failed"}


@app.route("/add_cart",methods=['GTE','POST'])
def add_cart():
    if(request.method=='POST'):
        data=request.get_json()
        # print(data)
        if(data):
            insert_cart(data)
            return{"status":"added"}
        
    
    return{"status":"not_added"}


@app.route("/cart_data",methods=['GET','POST'])
def cart_data():
    if(request.method=='POST'):
        data=request.get_json()
        res=cart_search(data)
        id_array=[]
        for i in res:
            id_array.append(i[0])
        # print(id_array)
        return {"cart_data":id_array}
    return {"status":"failed"}


@app.route("/remove_cart_product",methods=['GET','POST'])
def remove_cart_product():
    if(request.method=='POST'):
        data=request.get_json()
        # print(data)
        remove_cart(data)
        return {"status":"true"}
    return {"status":"false"}


@app.route("/user_purchase_data", methods=['GET','POST'])
def user_purchase_data():
    if request.method=="POST":
        data=request.get_json()
        # print(data["purchase_data"])
        result=purchase_data_insert(data)
        return {"status":result}

    return {"status":"failed"}


@app.route("/send_mail",methods=['GET','POST'])
def mail():
    if request.method=="POST":
        data=request.get_json()
        print(data)
        send_mail(data)
    return {"status":"mail_sent"}

#---------------------------------------------------------------------------------------



if __name__=="__main__":
    app.run(debug=True,port=8000)

