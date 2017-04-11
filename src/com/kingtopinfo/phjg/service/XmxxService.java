package com.kingtopinfo.phjg.service;

import com.kingtopinfo.phjg.mapper.XmxxMapper;
import com.kingtopinfo.phjg.entity.XmxxEntity;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.apache.ibatis.session.RowBounds;

/**
 * @ClassName com.kingtopinfo.phjg.service.XmxxService
 * @Description xmxx表Service类
 * @author 张秋权  zhangqq@kingtopinfo.com
 * @date 2017-04-10 16:51:51
 * @version 1.0
 * @remark create by generator
 */
@Service("XmxxService")
@Transactional
public class XmxxService {
	
	@Autowired
	private XmxxMapper xmxxMapper;
	
	/**
	 * 查询条数
	 * @param e XmxxEntity
	 * @return 条数
	 */
	public int getCount(XmxxEntity e){
		return xmxxMapper.getCount(e);
	}
	
	/**
	 * 按条件查询
	 * @param e XmxxEntity
	 * @param rowBounds 分页实体
	 * @return XmxxEntity
	 */
	public List<XmxxEntity> selectPagination(XmxxEntity e,int rows,int page){
		int start = (page-1)*rows;
		RowBounds rowBounds = new RowBounds(start,rows);
		return xmxxMapper.selectPagination(e,rowBounds);
	}
	
	/**
	 * 按id查询
	 * @param id 主键id
	 * @return XmxxEntity
	 */	
	public XmxxEntity selectByPkey(String id){
		return xmxxMapper.selectByPkey(id);
	}
	
	/**
	 * 新增
	 * @param e XmxxEntity
	 * @return 条数
	 */	
	public int insert(XmxxEntity e){
		return xmxxMapper.insert(e);
	}
	
	/**
	 * 编辑
	 * @param e XmxxEntity
	 * @return 条数
	 */	
	public int update(XmxxEntity e){
		return xmxxMapper.update(e);
	}
	
	/**
	 * 删除
	 * @param id
	 * @return 条数
	 */	
	private int delete(String id){
		return xmxxMapper.delete(id);
	}
	
	/**
	 * 批量删除
	 * @param idArray id
	 * @return 条数
	 */	
	public int deletes(String[] keys){
		int row = 0;
		for(String id : keys){
			row += delete(id);
		}
		return row;
	}

}