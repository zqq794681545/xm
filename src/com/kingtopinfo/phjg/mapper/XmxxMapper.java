package com.kingtopinfo.phjg.mapper;

import java.util.List;
import com.kingtopinfo.phjg.entity.XmxxEntity;
import org.apache.ibatis.session.RowBounds;
/**
 * @ClassName com.kingtopinfo.phjg.mapper.XmxxMapper
 * @Description xmxx表数据库操作接口
 * @author 张秋权  zhangqq@kingtopinfo.com
 * @date 2017-04-10 16:51:51
 * @version 1.0
 * @remark create by generator
 */

public interface XmxxMapper {
	
	int getCount(XmxxEntity e);
	List<XmxxEntity> selectPagination(XmxxEntity e,RowBounds rowBounds);
	XmxxEntity selectByPkey(String id);
	int insert(XmxxEntity e);
	int update(XmxxEntity e);
	int delete(String id);

}