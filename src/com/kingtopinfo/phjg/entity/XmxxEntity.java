package com.kingtopinfo.phjg.entity;

//import com.kingtopinfo.base.entity.BaseEntity;
import org.apache.struts2.json.annotations.JSON;

/**
 * @ClassName com.kingtopinfo.phjg.entity.XmxxEntity
 * @Description xmxx表实体类
 * @author 张秋权  zhangqq@kingtopinfo.com
 * @date 2017-04-10 16:51:51
 * @version 1.0
 * @remark create by generator
 */

public class XmxxEntity extends BaseEntity{

	private String phjgname;  //
	private int xzqh;  //
	private String id;  //
	
	public String getPhjgname(){
		return phjgname;
	}
	public void setPhjgname(String phjgname){
		this.phjgname = phjgname;
	}
	public int getXzqh(){
		return xzqh;
	}
	public void setXzqh(int xzqh){
		this.xzqh = xzqh;
	}
	public String getId(){
		return id;
	}
	public void setId(String id){
		this.id = id;
	}
}