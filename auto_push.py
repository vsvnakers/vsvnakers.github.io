import subprocess
from datetime import datetime

def run_git_commands():
    # 当前时间作为 commit 信息
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    commit_message = f'"{now}"'

    try:
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        subprocess.run({"git", "push", "origin", "main"}, check=True)
        print(f"✅ 已成功提交并推送：{commit_message}")
    except subprocess.CalledProcessError as e:
        print(f"❌ 出现错误：{e}")

if __name__ == "__main__":
    run_git_commands()

