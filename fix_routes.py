import os, glob

base_dir = r'c:\Users\nitin\Downloads\medical_delivery\Med_app\templates'
for f in glob.glob(os.path.join(base_dir, '**', '*.html'), recursive=True):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    orig = content
    # Fix url_for paths
    content = content.replace("url_for('auth.", "url_for('Med_auth.Med_")
    content = content.replace("url_for('user.", "url_for('Med_user.Med_")
    content = content.replace("url_for('store.", "url_for('Med_store.Med_")
    content = content.replace("url_for('admin.", "url_for('Med_admin.Med_")
    content = content.replace("url_for('payment.", "url_for('Med_payment.Med_")
    content = content.replace("url_for('order.", "url_for('Med_order.Med_")
    
    content = content.replace("url_for('auth_", "url_for('Med_auth.Med_")
    # Fix extends and includes
    content = content.replace('{% extends "base.html" %}', '{% extends "Med_base.html" %}')
    content = content.replace('{% extends "medical_dashboard.html" %}', '{% extends "Med_medical_dashboard.html" %}')
    content = content.replace('{% include "admin/partials/users_partial.html" %}', '{% include "admin/partials/Med_users_partial.html" %}')
    content = content.replace('{% include "admin/partials/stores_partial.html" %}', '{% include "admin/partials/Med_stores_partial.html" %}')
    content = content.replace('{% include "admin/partials/view_order_partial.html" %}', '{% include "admin/partials/Med_view_order_partial.html" %}')

    
    # Just in case
    content = content.replace('url_for("auth.', 'url_for("Med_auth.Med_')
    content = content.replace('url_for("user.', 'url_for("Med_user.Med_')
    content = content.replace('url_for("store.', 'url_for("Med_store.Med_')
    content = content.replace('url_for("admin.', 'url_for("Med_admin.Med_')
    content = content.replace('url_for("payment.', 'url_for("Med_payment.Med_')
    content = content.replace('url_for("order.', 'url_for("Med_order.Med_')
    
    # Check for legacy route naming (e.g., auth.login vs auth.Med_login)
    if orig != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Fixed routes in {f}')
