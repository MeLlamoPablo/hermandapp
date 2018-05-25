#!/bin/sh

cat > /usr/local/bin/hermandapp-server << EOF
#!/bin/sh
set -e

cd /backend

all_migrations="\$(python manage.py showmigrations)"

# Check if the migrations have been ran; if not, run them
pending_migrations="\$(
    echo "\$all_migrations" | \
    grep '\[ \]' | \
    wc -l
)"

# Check if this is the first time the migrations are being ran
# In that case, create the admin user
is_first_migration="\$(
    echo "\$all_migrations" | \
    grep '\[ \] 0001_initial' | \
    wc -l
)"

if [[ "\$pending_migrations" != "0" ]]; then
	python manage.py migrate

	if [[ "\$is_first_migration" != "0" ]]; then
	    echo "from django.contrib.auth.models import User;User.objects.create_superuser('admin', 'admin@hermand.app', 'admin');" | \
	    python manage.py shell
	    echo "Created user admin with password 'admin'"
	fi
fi

python manage.py runserver 0.0.0.0:4000
EOF

chmod +x /usr/local/bin/hermandapp-server
