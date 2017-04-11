package com.kingtopinfo.phjg.entity;

/**
 * com.kingtopinfo.base.entity.BaseEntity
 * Description :基础实体 BaseEntity  
 *              用于排序，当没有按照sort字段进行排序的时候，默认表的主键
 * @author lxc 
 * Create at 2016年10月27日 下午2:14:47
 */
public class BaseEntity {
	
	private String order = "desc";
	private String sort;
	
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	
}
