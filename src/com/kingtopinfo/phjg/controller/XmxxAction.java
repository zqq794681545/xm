package com.kingtopinfo.phjg.controller;

import com.kingtopinfo.phjg.service.XmxxService;
import com.kingtopinfo.phjg.entity.XmxxEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @ClassName com.kingtopinfo.phjg.controller.XmxxAction
 * @Description xmxx表Action类
 * @author 张秋权  zhangqq@kingtopinfo.com
 * @date 2017-04-10 16:51:51
 * @version 1.0
 * @remark create by generator
 */


@Controller()
@RequestMapping ( "/XmxxAction" )
public class XmxxAction{
	
	@Autowired
	private XmxxService xmxxService;
	
	private List<XmxxEntity> rows = new ArrayList<XmxxEntity>();
	private XmxxEntity e = new XmxxEntity();
	private int row = 0;
	private int total = 0;
	
	public List<XmxxEntity> getRows() {
		return rows;
	}
	public void setRows(List<XmxxEntity> rows) {
		this.rows = rows;
	}
	public XmxxEntity getE() {
		return e;
	}
	public void setE(XmxxEntity e) {
		this.e = e;
	}
	public int getRow() {
		return row;
	}
	public void setRow(int row) {
		this.row = row;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}

	/**
	 * 分页查询
	 */
	 @RequestMapping(value = "/selectPagination")  
	 @ResponseBody
	 public  Map<String, Object> selectPagination(HttpServletRequest request, XmxxEntity e) { 
	    Map<String, Object> map = new HashMap<String, Object>();  
		int _rows = Integer.parseInt(request.getParameter("rows"));
		int _page = Integer.parseInt(request.getParameter("page"));
		this.total = xmxxService.getCount(e);
		this.rows =  xmxxService.selectPagination(e,_rows,_page);
		map.put("total", this.total);
		map.put("rows", this.rows);
		return map;
	} 

	/**
	 * 通过主键查询
	 */	
	@RequestMapping(value = "/selectByPkey")  
	@ResponseBody
	public XmxxEntity  selectByPkey( XmxxEntity e){
		this.e = xmxxService.selectByPkey(e.getId());
		return this.e;
	}
	/**
	 * 新增
	 */	
	 @RequestMapping(value = "/insert")  
	 @ResponseBody
	public int insert(HttpServletRequest request,XmxxEntity e){
		this.row = xmxxService.insert(e);
		return this.row;
	}
	
	/**
	 * 编辑
	 */	
	 @RequestMapping(value = "/update")  
	 @ResponseBody
	public int update(XmxxEntity e){
		this.row = xmxxService.update(e);
		return this.row;
	}
	
	/**
	 * 删除
	 */	
	 @RequestMapping(value = "/deletes")  
	 @ResponseBody
	public int deletes(String[] keys){
		this.row = xmxxService.deletes(keys);
		return this.row;
	}
	
}