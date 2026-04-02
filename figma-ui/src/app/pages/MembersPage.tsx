import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, User, Edit2, Trash2 } from "lucide-react";
import { Member } from "../types";

export default function MembersPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    const membersData = JSON.parse(localStorage.getItem("members") || "[]");
    setMembers(membersData);
  };

  const handleAddMember = (member: Member) => {
    const updated = [...members, member];
    localStorage.setItem("members", JSON.stringify(updated));
    setMembers(updated);
    setShowAddForm(false);
  };

  const handleDeleteMember = (id: string) => {
    if (id === "1") {
      alert("不能删除本人");
      return;
    }

    if (!confirm("确定要删除此成员吗？成员的所有档案也将被删除。")) return;

    const updated = members.filter((m) => m.id !== id);
    localStorage.setItem("members", JSON.stringify(updated));
    setMembers(updated);

    // Also delete member's archives
    const archives = JSON.parse(localStorage.getItem("archives") || "[]");
    const filteredArchives = archives.filter((a: any) => a.memberId !== id);
    localStorage.setItem("archives", JSON.stringify(filteredArchives));
  };

  const handleSwitchMember = (id: string) => {
    localStorage.setItem("currentMemberId", id);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-card border-b border-border px-4 py-4 z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="font-semibold">成员管理</h2>
          <button onClick={() => setShowAddForm(true)} className="p-2 -mr-2">
            <Plus className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {showAddForm ? (
          <AddMemberForm
            onSubmit={handleAddMember}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              管理家庭成员，为每个人单独建档
            </p>

            <div className="space-y-3">
              {members.map((member) => {
                const archivesCount = JSON.parse(localStorage.getItem("archives") || "[]").filter(
                  (a: any) => a.memberId === member.id && !a.isDeleted
                ).length;

                return (
                  <div
                    key={member.id}
                    className="bg-card rounded-xl border border-border p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{member.name}</h3>
                          <span className="px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground">
                            {member.relation}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-0.5">
                          {member.gender && <div>性别：{member.gender}</div>}
                          {member.birthday && <div>生日：{member.birthday}</div>}
                          {member.bloodType && <div>血型：{member.bloodType}</div>}
                          <div className="text-primary font-medium mt-1">
                            {archivesCount} 份档案
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleSwitchMember(member.id)}
                        className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        查看档案
                      </button>
                      {member.id !== "1" && (
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {members.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4 mx-auto">
                  <User className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">还没有成员</h3>
                <p className="text-muted-foreground mb-6">添加家庭成员，统一管理健康档案</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>添加成员</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function AddMemberForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (member: Member) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [allergies, setAllergies] = useState("");

  const handleSubmit = () => {
    if (!name || !relation) {
      alert("请填写姓名和关系");
      return;
    }

    const newMember: Member = {
      id: Date.now().toString(),
      name,
      relation,
      gender,
      birthday,
      bloodType,
      allergies,
    };

    onSubmit(newMember);
  };

  return (
    <div>
      <h3 className="font-semibold mb-4">添加成员</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">姓名 *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入姓名"
            className="w-full px-4 py-3 rounded-xl border border-input bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">关系 *</label>
          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-input bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">请选择</option>
            <option value="父亲">父亲</option>
            <option value="母亲">母亲</option>
            <option value="配偶">配偶</option>
            <option value="子女">子女</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">性别</label>
          <div className="grid grid-cols-2 gap-3">
            {["男", "女"].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`py-3 rounded-xl transition-all ${
                  gender === g
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">出生日期</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-input bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">血型</label>
          <select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-input bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">请选择</option>
            <option value="A">A型</option>
            <option value="B">B型</option>
            <option value="AB">AB型</option>
            <option value="O">O型</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">过敏史</label>
          <textarea
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="如：青霉素过敏、海鲜过敏等"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-input bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
        >
          取消
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          保存
        </button>
      </div>
    </div>
  );
}
