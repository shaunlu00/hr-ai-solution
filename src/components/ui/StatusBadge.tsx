const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  // 通用
  active: { label: '进行中', color: '#22c55e', bg: '#f0fdf4' },
  completed: { label: '已完成', color: '#6366f1', bg: '#eef2ff' },
  pending: { label: '待处理', color: '#f59e0b', bg: '#fffbeb' },
  rejected: { label: '已拒绝', color: '#ef4444', bg: '#fef2f2' },
  withdrawn: { label: '已撤回', color: '#64748b', bg: '#f1f5f9' },
  hired: { label: '已入职', color: '#22c55e', bg: '#f0fdf4' },
  // 岗位
  draft: { label: '草稿', color: '#64748b', bg: '#f1f5f9' },
  published: { label: '已发布', color: '#22c55e', bg: '#f0fdf4' },
  closed: { label: '已关闭', color: '#ef4444', bg: '#fef2f2' },
  // 面试
  scheduled: { label: '已排期', color: '#3b82f6', bg: '#eff6ff' },
  'in-progress': { label: '进行中', color: '#f59e0b', bg: '#fffbeb' },
  cancelled: { label: '已取消', color: '#64748b', bg: '#f1f5f9' },
  // 定级
  confirmed: { label: '已确认', color: '#22c55e', bg: '#f0fdf4' },
  adjusted: { label: '已调整', color: '#f59e0b', bg: '#fffbeb' },
  // Offer
  sent: { label: '已发送', color: '#3b82f6', bg: '#eff6ff' },
  accepted: { label: '已接受', color: '#22c55e', bg: '#f0fdf4' },
  declined: { label: '已拒绝', color: '#ef4444', bg: '#fef2f2' },
  expired: { label: '已过期', color: '#64748b', bg: '#f1f5f9' },
  // 审批
  approved: { label: '已通过', color: '#22c55e', bg: '#f0fdf4' },
  // 背调
  verified: { label: '已验证', color: '#22c55e', bg: '#f0fdf4' },
  warning: { label: '需关注', color: '#f59e0b', bg: '#fffbeb' },
  failed: { label: '未通过', color: '#ef4444', bg: '#fef2f2' },
  pass: { label: '通过', color: '#22c55e', bg: '#f0fdf4' },
  fail: { label: '未通过', color: '#ef4444', bg: '#fef2f2' },
  alert: { label: '异常', color: '#ef4444', bg: '#fef2f2' },
};

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const cfg = STATUS_MAP[status] || { label: status, color: '#64748b', bg: '#f1f5f9' };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
      style={{ backgroundColor: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}
